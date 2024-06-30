import { QueryInterface, DataTypes } from "sequelize";
//
module.exports = {

  up: (queryInterface: QueryInterface) => {
    return Promise.all([

      queryInterface.addColumn("QuickMessages", "geral", {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("QuickMessages", "geral")
    ]);
  }

};
