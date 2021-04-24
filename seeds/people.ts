import { Knex } from "knex";
import faker from "faker";

const MS_PER_YEAR = 31557600000;
const TABLE_NAME = "people";

const { date, name } = faker;

async function seed(knex: Knex): Promise<void> {
  try {
    // await knex("users").del();

    const insertBatch = async () => {
      const batch = [];

      for (let i = 1; i < 200; i++) {
        const genderNum = Math.round(Math.random());
        const minAge = new Date(Date.now() - MS_PER_YEAR * 18);
        const maxAge = new Date(Date.now() - MS_PER_YEAR * 100);

        batch.push({
          first_name: name.firstName(genderNum),
          last_name: name.lastName(),
          gender: genderNum ? "female" : "male",
          birthdate: date.between(minAge, maxAge).toJSON().split("T")[0],
        });
      }

      await knex(TABLE_NAME).insert(batch);
    };

    for (let i = 1; i < 1; i++) {
      await insertBatch();
    }
  } catch (e) {
    console.error(e);
  }
}

export { seed };
