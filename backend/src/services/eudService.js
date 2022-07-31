const pool = require('../config/database');

module.exports.getSingleUsage = async function (startdate, enddate) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    AND DATE(start_time) >= $1 
    AND DATE(end_time) = $2
    ORDER BY equip_id, recipe_id;
    `,
      [startdate, enddate]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleUsage = async function (startdate, enddate) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    AND DATE(start_time) >= $1 
    AND DATE(end_time) = $2
    ORDER BY equip_id, recipe_id;
    `,
      [startdate, enddate]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getSingleUsageDetails = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time, (end_time - start_time) as duration
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    AND DATE(start_time) >= $1
    AND DATE(end_time) = $2
	  AND (end_time - start_time) > $3
    ORDER BY equip_id, recipe_id;
    `,
      [startdate, enddate, hour]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleUsageDetails = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT pd.name as equipment, r.name as recipe, start_time, end_time, (end_time - start_time) as duration
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    AND DATE(start_time) >= $1
    AND DATE(end_time) = $2
	  AND (end_time - start_time) > $3
    ORDER BY equip_id, recipe_id;
    `,
      [startdate, enddate, hour]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};
<<<<<<< HEAD

module.exports.getSingleEquipmentLeftUnused = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT DISTINCT ON (pd.name) pd.name AS equipment, r.name as recipe, start_time, end_time, 
	  (start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) as difference
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    AND DATE(start_time) >= $1
    AND DATE(end_time) = $2
    AND (start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) > $3
    ORDER BY equipment, equip_id, recipe_id;
    `,
      [startdate, enddate, hour]
    );
    console.log('Results:');
    console.log(rows);
    console.log('End of results...');
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleEquipmentLeftUnused = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT DISTINCT ON (pd.name) pd.name AS equipment, r.name as recipe, start_time, end_time, 
	  (start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) as difference
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    AND DATE(start_time) >= $1
    AND DATE(end_time) = $2
    AND (start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) > $3
    ORDER BY equipment, equip_id, recipe_id;
    `,
      [startdate, enddate, hour]
    );
    console.log('Results:');
    console.log(rows);
    console.log('End of results...');
    return rows;
  } catch (error) {
    console.log(error);
  }
};

// weekly
module.exports.getSingleWeekly = async function (startdate, enddate) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT TO_CHAR(start_time, 'DD/MM/YYYY') AS day, pd.name as equipment, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    AND DATE(start_time) BETWEEN $1 AND $2
    AND DATE(end_time) < $2
    ORDER BY DATE(start_time), equipment, start_time asc;
    `,
      [startdate, enddate]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleWeekly = async function (startdate, enddate) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT TO_CHAR(start_time, 'DD/MM/YYYY') AS day, pd.name as equipment, start_time, end_time
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    AND DATE(start_time) BETWEEN $1 AND $2
    AND DATE(end_time) < $2
    ORDER BY DATE(start_time), equipment, start_time ASC;
    `,
      [startdate, enddate]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getSingleWeeklyDetails = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT to_char(DATE(start_time),'Day') AS day, TO_CHAR(start_time, 'DD/MM/YYYY') as date,
    pd.name as equipment, r.name as recipe, 
    start_time, end_time, (end_time - start_time) as duration
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
    AND DATE(start_time) BETWEEN $1 AND $2
    AND DATE(end_time) < $2
    AND end_time - start_time > $3
    ORDER BY DATE(start_time), equipment, start_time ASC;
    `,
      [startdate, enddate, hour]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleWeeklyDetails = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT to_char(DATE(start_time), 'Day') AS day, TO_CHAR(start_time, 'DD/MM/YYYY') as date,
    pd.name as equipment, r.name as recipe, 
    start_time, end_time, (end_time - start_time) as duration
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
    AND DATE(start_time) BETWEEN $1 AND $2
    AND DATE(end_time) < $2
    AND end_time - start_time > $3
    ORDER BY DATE(start_time), start_time asc;
    `,
      [startdate, enddate, hour]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};
module.exports.getSingleUnusedWeekly = async function (
  startdate,
  enddate,
  hour
) {
  console.log(startdate);
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT DISTINCT ON (pd.name) pd.name AS equipment, 
	to_char(DATE(start_time), 'Day') AS day, 
	TO_CHAR(start_time, 'DD/MM/YYYY') as date, start_time, end_time, 
	(start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) as difference
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 1
	  AND DATE(end_time) BETWEEN $1 AND $2
    AND (start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) > $3
    ORDER BY pd.name, DATE(start_time) asc, difference;
    `,
      [startdate, enddate, hour]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMultipleUnusedWeekly = async function (
  startdate,
  enddate,
  hour
) {
  try {
    const { rows } = await pool.query(
      `WITH query as (
    SELECT id, equip_id, recipe_id, log_action,
    LAG(log_time,1) OVER (
        ORDER BY recipe_id asc, id
    ) start_time, log_time as end_time
    FROM 
    log_times 
    )

    SELECT DISTINCT ON (pd.name) pd.name AS equipment, 
	to_char(DATE(start_time), 'Day') AS day, 
	TO_CHAR(start_time, 'DD/MM/YYYY') as date, start_time, end_time, 
	(start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) as difference
    FROM query q, physical_devices pd, recipes r
    WHERE log_action = 2
    AND q.equip_id = pd.id
    AND q.recipe_id = r.id
    AND pd.mac_property = 2
	AND DATE(end_time) BETWEEN $1 AND $2
    AND (start_time - CONCAT(DATE(end_time), ' 00:00:00')::timestamp) > $3
    ORDER BY pd.name, DATE(start_time) asc, difference;
    `,
      [startdate, enddate, hour]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllEquipment = async function () {
  try {
    const { rows } = await pool.query(
      `SELECT name from physical_devices ORDER BY mac_property, name
    `
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
