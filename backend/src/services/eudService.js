const pool = require('../config/database');

module.exports.getSingleUsage = async function (date) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time, DATE(log_time) as date
    FROM 
    log_times
    WHERE DATE(log_time) = $1
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    ORDER BY equip_id, recipe_id;
    `,
      [date]
    );

    let singleArr = [];
    for (let i = 0; i < rows.length; i++) {
      singleArr.push(Object.values(rows[i]));
    }
    return singleArr;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleUsage = async function (date) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time, DATE(log_time) as date
    FROM 
    log_times
    WHERE DATE(log_time) = $1 
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    ORDER BY equip_id, recipe_id;
    `,
      [date]
    );

    let multipleArr = [];
    for (let i = 0; i < rows.length; i++) {
      multipleArr.push(Object.values(rows[i]));
    }
    return multipleArr;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getSingleUsageDetails = async function (date, hour) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time, DATE(log_time) as date
    FROM 
    log_times
    WHERE DATE(log_time) = $1
    )

    SELECT pd.name as equipment, r.name as recipe, end_time - start_time as duration
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    AND (end_time - start_time) > $2
    ORDER BY equip_id, recipe_id;
    `,
      [date, hour]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleUsageDetails = async function (date, hour) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time, DATE(log_time) as date
    FROM 
    log_times
    WHERE DATE(log_time) = $1
    )

    SELECT pd.name as equipment, r.name as recipe, end_time - start_time as duration
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    AND (end_time - start_time) > $2
    ORDER BY equip_id, recipe_id;
    `,
      [date, hour]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};
