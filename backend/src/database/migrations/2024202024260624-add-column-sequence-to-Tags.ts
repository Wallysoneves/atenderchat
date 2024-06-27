import { QueryInterface, DataTypes } from "sequelize";
//
module.exports = {

  up: (queryInterface: QueryInterface) => {
    return Promise.all([

      queryInterface.addColumn("Tags", "sequence", {
        type: DataTypes.INTEGER,
        allowNull: true,
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("Tags", "sequence")
    ]);
  }

};
