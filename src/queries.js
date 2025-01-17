// Query para criar um registro na database
const createRecordQuery = (tableId, title, fields) => `
  mutation {
    createTableRecord(input: {
      table_id: "${tableId}",
      title: "${title}",
      fields_attributes: [
        ${fields
          .map(
            (field) =>
              `{ field_id: "${field.id}", field_value: "${field.value}" }`
          )
          .join(", ")}
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

module.exports = { createRecordQuery };
