const definitions = [
  {
      name: "module",
      applicability: {
          create: true,
          read: true,
          update: true,
          delete: true,
      },
      properties: {
          name: {
              type: "string",
              required: true,
          },
          description: {
              type: "string",
          },
          icon: {
              type: "string",
              format: "icon",
          },
      },
      relations: {
          pages: {
              applicability: {
                  create: true,
                  read: true,
                  update: true,
                  delete: true,
              },
              resource: "page",
              cardinality: "many",
              unique: true,
          },
      },
      semantics: {
          title: "name",
          description: ["description"],
      },
  },
  {
      name: "page",
      applicability: {
          read: true,
          create: true,
          update: true,
          delete: true,
      },
      properties: {
          name: {
              type: "string",
              required: true,
          },
          description: {
              type: "string",
              required: false,
          },
          icon: {
              type: "string",
              format: "icon",

          },
      },
      relations: {
          module: {
              applicability: {
                  read: true,
                  create: true,
                  update: true,
                  delete: true,
              },
              resource: "module",
              cardinality: "one",
          },
          views: {
              applicability: {
                  read: true,
                  create: true,
                  update: true,
                  delete: true,
              },
              resource: "view",
              cardinality: "many",
          },
      },
      semantics: {
          title: "name",
          description: ["description"],
      },
  },
  {
      name: "view",
      applicability: {
          read: true,
          create: true,
          update: true,
          delete: true,
      },
      properties: {
          name: {
              type: "string",
              required: true,
          },
          description: {
              type: "string",
              required: false,
          },
          icon: {
              type: "string",
              format: "icon",

          },
      },
      relations: {
          page: {
              applicability: {
                  read: true,
                  create: true,
                  update: true,
                  delete: true,
              },
              resource: "page",
              cardinality: "one",
          },
          widgets: {
              applicability: {
                  read: true,
                  create: true,
                  update: true,
                  delete: true,
              },
              resource: "widget",
              cardinality: "many",
          },
      },
      semantics: {
          title: "name",
          description: ["description"],
      },
  },
  {
      name: "widget",
      applicability: {
          read: true,
          create: true,
          update: true,
          delete: true,
      },
      properties: {
          name: {
              type: "string",
              required: true,
          },
          icon: {
              type: "string",
              format: "icon",
          },
          configuration: {
              oneOf: [
                  {
                      title: "collection",
                      schema: {
                          type: "object",
                          properties: {
                              resource: {
                                  type: "string",
                                  required: true,
                              },
                          },
                      },
                  },
                  {
                      title: "object",
                      schema: {
                          type: "object",
                          properties: {
                              resource: {
                                  type: "string",
                                  required: true,
                              },
                              identifier: {
                                  type: "string",
                                  required: true,
                              },
                          },
                      },
                  },
              ],
          },
          component: {
              type: "object",
              properties: {
                  name: {
                      type: "string",
                      required: true,
                  },
                  configuration: {
                      type: "string",
                      format: "code"
                  },
              },
              required: true,
          },
          layout: {
              type: "object",
              properties: {
                  x: {
                      type: "number",
                      required: true,
                  },
                  y: {
                      type: "number",
                      required: true,
                  },
                  w: {
                      type: "number",
                      required: true,
                  },
                  h: {
                      type: "number",
                      required: true,
                  },
              },
          },
      },
      relations: {
          view: {
              applicability: {
                  read: true,
                  create: true,
                  update: true,
                  delete: true,
              },
              resource: "view",
              cardinality: "one",
          },
      },
      semantics: {
          title: "name",
          description: ["description"],
      },
  },
];

module.exports = definitions;
