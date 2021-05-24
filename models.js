




export const CardSchema = {
  name: 'CardSchema',
  primaryKey: 'CardId',
  properties: {
    CardId: 'int',
    CardName: 'string',
    CardModel: 'string'
  }
};


export const TempCarSchema = {
  name: 'ModelSchema',
  primaryKey: 'ModelId',
  properties: {
    ModelId: 'int',
    ModelName: 'string',
    ModelImage1: 'string',
    ModelImage2: 'string',
    ModelImage3: 'string',
    ModelImage4: 'string',
    ModelImage5: 'string',
  }
};
