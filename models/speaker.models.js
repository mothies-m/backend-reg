module.exports = (Sequelize, sequelize) => {
  const Speaker = sequelize.define(
    "Speaker",
    {
      speaker_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      expertise: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price_per_session: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      tableName: "speakers",
      timestamps: false,
    }
  );

  return Speaker;
};
