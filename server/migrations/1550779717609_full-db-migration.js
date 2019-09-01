exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "bluejaysscouting"."hitters" (
      "id" SERIAL PRIMARY KEY,
      "firstname" TEXT,
      "lastname" TEXT,
      "fullname" TEXT,
      "position" TEXT,
      "team" TEXT,
      "scouting_report" TEXT,
      "scouting_future_value" INT CHECK (scouting_future_value >= 20 AND scouting_future_value <= 80)
    );
  `),
  pgm.sql(`
    CREATE TABLE "bluejaysscouting"."scouting_hitter_tools" (
      "id" SERIAL PRIMARY KEY,
      "hitter_id" INT NOT NULL,
      "name" TEXT,
      "grade" INT CHECK (grade >= 20 AND grade <= 80)
    );
    `),
  pgm.sql(`
    CREATE TABLE "bluejaysscouting"."pitchers" (
      "id" SERIAL PRIMARY KEY,
      "firstname" TEXT,
      "lastname" TEXT,
      "fullname" TEXT,
      "position" TEXT,
      "team" TEXT,
      "scouting_report" TEXT,
      "scouting_future_value" INT CHECK (scouting_future_value >= 20 AND scouting_future_value <= 80)
    );
  `),
  pgm.sql(`
    CREATE TABLE "bluejaysscouting"."scouting_pitches" (
      "id" SERIAL PRIMARY KEY,
      "pitcher_id" INT NOT NULL,
      "pitch_name" TEXT,
      "grade" INT CHECK (grade >= 20 AND grade <= 80),
      "velocity" FLOAT(1)
    );
    `)
};