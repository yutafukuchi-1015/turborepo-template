const handler = {
  get() {
    const f = () => "value returned from client mock function";
    Object.setPrototypeOf(f, new Proxy({}, handler));
    return f;
  },
};
// for storybook
export const client = new Proxy({}, handler);
