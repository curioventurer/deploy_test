import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', (client) => {
  console.log(formatTime(), 'connect', client.processID);
})

pool.on('acquire', (client) => {
  console.log(formatTime(), 'acquire', client.processID);
})

pool.on('release', (err, client) => {
  console.log(formatTime(), 'release', client.processID);
})

pool.on('remove', (client) => {
  console.log(formatTime(), 'remove ', client.processID);
})

function formatTime(time = new Date()) {
  const DIGITS = 4;
  return (time.valueOf() % Math.pow(10, DIGITS)).toString().padStart(DIGITS, ' ');
}

async function findUserById(id) {
  console.log(formatTime(), id, "start")

  const { rows } = await pool.query(
    "SELECT id FROM users WHERE id = $1",
    [id],
  );
  const val = rows[0];

  console.log(formatTime(), id, "end")
  return val;
}

async function f() {
  await findUserById(1);
  await findUserById(2);
  await findUserById(3);
  await findUserById(4);
}
export default f;