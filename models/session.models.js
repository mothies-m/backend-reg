module.exports = (Sequelize, sequelize) => {
  const Session = sequelize.define(
    "Session",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      speaker_id: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time_slot: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      tableName: "sessions",
      timestamps: false,
      uniqueKeys: {
        speaker_time_slot_unique: {
          fields: ["speaker_id", "date", "time_slot"],
        },
      },
    }
  );
  return Session;
};
