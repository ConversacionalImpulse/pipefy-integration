// Query para criar um registro na database
const createRecordQuery = (tableId, title, fields) => {
  const fieldsAttributes = fields
    .map((field) =>
      `{ field_id: "${field.id}", field_value: ${JSON.stringify(field.value)} }`
    )
    .join(", ");

  return `
    mutation {
      createTableRecord(input: {
        table_id: "${tableId}",
        title: ${JSON.stringify(title)},
        fields_attributes: [
          ${fieldsAttributes}
        ]
      }) {
        table_record {
          id
          title
          record_fields {
            name
            value
          }
        }
      }
    }
  `;
};

// Query para verificar duplicatas
const checkDuplicateQuery = (tableId, email, telefone) => {
  return `
    query {
      table_records(table_id: "${tableId}", filter: {
        and: [
          { field: "email", operator: "EQUALS", value: "${email}" },
          { field: "telefone", operator: "EQUALS", value: "${telefone}" }
        ]
      }) {
        edges {
          node {
            id
            title
            record_fields {
              name
              value
            }
          }
        }
      }
    }
  `;
};


module.exports = { createRecordQuery, checkDuplicateQuery };
