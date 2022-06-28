const Sequelize = require("sequelize");

/*
 * 해시태그 모델은 태그 이름을 저장한다.
 * 해시태그 모델을 따로 두는 것은 나중에 태그로 곰색하기 위해서 이다.
 * */

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
