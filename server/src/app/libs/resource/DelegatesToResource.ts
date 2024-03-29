export class DelegatesToResource {
  private proxy;
  constructor(public resource: any) {
    if (!(resource instanceof Object)) {
      resource = {};
    }

    this.resource = resource;

    this.proxy = new Proxy(this, {
      get(target: any, property) {
        if (target[property]) {
          return target[property];
        }

        if (resource[property]) {
          return resource[property];
        }

        return undefined;
      },
    });

    return this.proxy;
  }
}
