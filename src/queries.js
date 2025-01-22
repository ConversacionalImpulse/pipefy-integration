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

module.exports = { createRecordQuery };
