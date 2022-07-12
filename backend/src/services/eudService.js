const client = require('../config/database');

module.exports.getSingleUsage = async function () {
  client.connect();
  try {
    const { rows } = await client.query(`WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time, DATE(log_time) as date
    FROM 
    log_times
    WHERE DATE(log_time) >= '2021-08-12'
    AND DATE(log_time) < '2021-08-13'
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    ORDER BY equip_id, recipe_id;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleUsage = async function () {
  client.connect();
  try {
    const { rows } = await client.query(`WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time, DATE(log_time) as date
    FROM 
    log_times
    WHERE DATE(log_time) >= '2021-08-12' 
    AND DATE(log_time) < '2021-08-13'
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    ORDER BY equip_id, recipe_id;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
