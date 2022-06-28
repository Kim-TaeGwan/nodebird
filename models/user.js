const Sequelize = require("sequelize");

/*
 * 사용자 정보를 저장하는 모델이다.
 * 이메일, 닉네임, 비밀번호를 저장하고, SNS 로그인을 했을 경우에는 provider 와 snsId 를 저장한다.
 * provider 가 local 이면 로컬 로그인을 한 것이고, kakao 면 카카오 로그인을 한 것 이다.
 * 기본적으로 로컬 로그인이라 가정해서 defaultValue 를 local 로 주었음.
 *
 * 테이블 옵션으로 timestamps 와 paranoid 가 true 로 주어졌으므로 createAt, updateAt, deleteAt 컬럼도 생성된다.
 * */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    /*
     * User 모델과 Post 모델은 1(User):N(Post) 관계에 있으므로 hasMany 로 연결되어있다.
     * user.getPosts, user.addPosts 같은 관계 메서드들이 생성된다.
     *
     * */
    db.User.hasMany(db.post);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
};
