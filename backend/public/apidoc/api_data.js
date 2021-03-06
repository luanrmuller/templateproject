define({ "api": [
  {
    "type": "get",
    "url": "/api/products?page=1&pageSize=10&fields=name",
    "title": "code&filters[eq]=name:prod&sort=code",
    "name": "Products",
    "group": "Product",
    "header": {
      "fields": {
        "MyHeaderGroup": [
          {
            "group": "MyHeaderGroup",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Value of offset ex: 1.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>Value of limit ex: 1.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Filds on response ex: name code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "filters",
            "description": "<p>List of filters ex: name:prod.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Sort",
            "description": "<p>Sort order of list ex: code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\"code\": \"1234\",\"name\": \"prod 1\" },\n  {\"code\": \"1235\",\"name\": \"prod 2\" }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/controllers/registrations/ProductController.js",
    "groupTitle": "Product"
  }
] });
