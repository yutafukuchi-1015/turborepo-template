import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import path from "path";
import * as ts from "typescript";

function generateApiCode() {
  const appFilePath = resolve(process.cwd(), "../../server/src/index.ts");
  const sourceFile = ts.createSourceFile(
    appFilePath,
    readFileSync(appFilePath, "utf-8"),
    ts.ScriptTarget.Latest,
    true
  );

  let routes: { path: string; hasId: boolean }[] = [];

  const visit = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.getText() === "route"
    ) {
      const args = node.arguments;
      if (args.length >= 1 && ts.isStringLiteral(args[0]!)) {
        const routePath = args[0].text;
        const routeName = routePath.replace(/^\//, "");

        // Add base route
        routes.push({
          path: routeName,
          hasId: routeName === "employees", // 従業員ルートのみIDパラメータを持つと仮定
        });
      }
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(sourceFile, visit);

  routes.forEach((route) => {
    const baseName = route.path.charAt(0).toUpperCase() + route.path.slice(1);
    const dirPath = path.join(".", route.path);

    // ディレクトリが存在しない場合は作成
    mkdirSync(dirPath, { recursive: true });

    let output = `import { client } from "@/server/src";

export const use${baseName} = async () =>
  await (
    await client.${route.path}.$get(undefined, {
      fetch: () =>
        fetch(client.${route.path}.$url(), {
          method: "GET",
          cache: "no-store", // SSR
        }),
    })
  ).json();`;

    // IDパラメータを持つルートの場合
    if (route.hasId) {
      output += `\n\nexport const useSingle${baseName.slice(0, -1)} = async ({ id }: { id: string }) =>
  await (
    await client.${route.path}[":id"].$get({ param: { id } },{
      fetch: () =>
        fetch(client.${route.path}[":id"].$url({ param: { id } }), {
          method: "GET",
          cache: "no-store", // SSR
        }),
    })
  ).json();`;
    }

    // 各ルートごとにファイルを生成
    writeFileSync(path.join(dirPath, "api.ts"), output);
    console.log(
      `Successfully generated API functions in ${path.join(dirPath, "api.ts")}`
    );
  });
}

generateApiCode();
