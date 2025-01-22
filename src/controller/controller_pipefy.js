const createdata = async (req, res) => {
    const { title, fields } = req.body;
  
    try {
      // Verifica se os campos obrigatórios estão presentes
      const emailField = fields.find((field) => field.id === "email")?.value;
      const telefoneField = fields.find((field) => field.id === "telefone")?.value;
  
      if (!emailField || !telefoneField) {
        return res.status(400).json({ message: "E-mail e telefone são obrigatórios!" });
      }
  
      // Gera a query para verificar duplicatas
      const checkQuery = checkDuplicateQuery(TABLE_ID, emailField, telefoneField);
      const checkResult = await executeQuery(checkQuery);
  
      // Verifica se já existem registros com e-mail ou telefone duplicados
      const existingRecords = checkResult.data.table_records.edges;
      
      if (existingRecords.length > 0) {
        console.log("Registros duplicados encontrados:", existingRecords);
        return res.status(409).json({ 
          message: "E-mail ou telefone já cadastrado no sistema!",
          existingRecords: existingRecords.map((record) => ({
            id: record.node.id,
            title: record.node.title,
            fields: record.node.record_fields,
          })),
        });
      }
  
      // Gera a query para criar o registro
      const createQuery = createRecordQuery(TABLE_ID, title, fields);
      const createResult = await executeQuery(createQuery);
  
      // Retorna o registro criado
      res.status(201).json({
        message: "Registro criado com sucesso!",
        result: createResult.data.createTableRecord.table_record,
      });
    } catch (error) {
      console.error("Erro ao criar registro:", error.message);
      res.status(500).json({
        message: "Erro interno ao criar registro",
        error: error.response?.data || error.message,
      });
    }
  };
  