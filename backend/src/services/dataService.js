const pool = require('../config/database');

module.exports.getData1 = async function () {
  try {
    const { rows } = await pool.query(`SELECT 
                            rf.fr_recipe_id, r.name
                        FROM (SELECT  equip_id,
                            log_action,
                            fr_process_steps,
                            start_log_time,
                            end_log_time,
                            end_log_time - start_log_time AS duration
                        FROM  ( SELECT  
                            equip_id, 
                            log_action,
                            fr_process_steps,
                            log_time AS start_log_time,
                            ( SELECT  MIN(log_time) 
                            FROM (
                                SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
                                    UNION ALL
                                    SELECT null, mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) T2
                                WHERE   T2.fr_process_steps = T1.fr_process_steps
                                AND     T2.log_action = 2
                                AND     T2.log_time > T1.log_time
                            ) AS end_log_time
                        FROM ( SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
                                UNION ALL
                                SELECT null, mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) T1
                        WHERE T1.log_action = 1
                            ) AS T 
                        ) AS t
                        INNER JOIN recipe_flows rf
                        ON rf.id = t.fr_process_steps
                        INNER JOIN recipes r
                        ON r.id = rf.fr_recipe_id
                        INNER JOIN process_steps ps
                        ON ps.id = rf.fr_process_step
                        GROUP BY fr_recipe_id, r.name 
						ORDER BY fr_recipe_id ASC;
        `); // end of SQL query
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getRecipebyRecipeID = async function (id) {
  try {
    const { rows } = await pool.query(
      `SELECT 
                            rf.fr_recipe_id, r.name, rf.queue, t.fr_process_steps, ps.process_name, rf.desc_translate, AVG(t.duration)
                        FROM (SELECT  equip_id,
                            log_action,
                            fr_process_steps,
                            start_log_time,
                            end_log_time,
                            end_log_time - start_log_time AS duration
                        FROM  ( SELECT  
                            equip_id, 
                            log_action,
                            fr_process_steps,
                            log_time AS start_log_time,
                            ( SELECT  MIN(log_time) 
                            FROM (
                                SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
                                    UNION ALL
                                    SELECT null, mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) T2
                                WHERE   T2.fr_process_steps = T1.fr_process_steps
                                AND     T2.log_action = 2
                                AND     T2.log_time > T1.log_time
                            ) AS end_log_time
                        FROM ( SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
                                UNION ALL
                                SELECT null, mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) T1
                        WHERE T1.log_action = 1
                            ) AS T 
                        ) AS t
                        INNER JOIN recipe_flows rf
                        ON rf.id = t.fr_process_steps and rf.fr_recipe_id = $1 
                        INNER JOIN recipes r
                        ON r.id = rf.fr_recipe_id
                        INNER JOIN process_steps ps
                        ON ps.id = rf.fr_process_step
                        GROUP BY fr_recipe_id, r.name, rf.queue, fr_process_steps, ps.process_name, rf.desc_translate;
                        `,
      [id]
    ); // end of sql query
    return rows;
  } catch (error) {
    console.log(error);
  }
};

// query for production Count
module.exports.prodCount = async function () {
  try {
    const { rows } =
      await pool.query(`SELECT DATE_TRUNC('DAY', p.log_time), COUNT(*)
FROM 
	(SELECT lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
	UNION ALL
	SELECT mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) AS p,
	(SELECT *, ROW_NUMBER() OVER (PARTITION BY fr_recipe_id ORDER BY id DESC) AS rn
  	FROM recipe_flows) ls
WHERE log_action = 2
AND ls.rn = 1
AND p.fr_process_steps = ls.id
GROUP BY DATE_TRUNC('DAY', p.log_time);

        `); // end of SQL query
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMachineConnectivity = async function () {
  try {
    const { rows } = await pool.query(`
      SELECT DISTINCT ON (client_no) 
        a.client_no, 
        a.ttl, 
        a.created_at,
        b.machine_name,
        b.location_id
      FROM 
        client_health_statuses as a
      JOIN 
        log_station_clients as b 
      ON 
        a.client_no = b.machine_id
      WHERE 
        a.created_at >= '2021-08-21 00:00:00' AND a.created_at < '2021-08-22 00:00:00'
      ORDER BY 
        client_no, created_at DESC;
      `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMachines = async function () {
  try {
    const { rows } = await pool.query(`
      SELECT
        machine_name,
        machine_id
      FROM
        log_station_clients
      `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllEquipments = async function () {
  try {
    const { rows } = await pool.query(`
      SELECT DISTINCT 
          lt.equip_id as equipmentID,
          pd.name as equipment_name
      FROM
          log_times as lt
      INNER JOIN
          physical_devices as pd
      ON lt.equip_id = pd.id
      `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getStartOfEquipment = async function (
  start,
  end,
  startOrStop,
  equipmentId,
  totalDataLength
) {
  console.log(equipmentId);
  let tempArr = [];
  for (let i = 0; i < equipmentId.length; i++) {
    try {
      const { rows } = await pool.query(
        `
        SELECT
            lt.equip_id as equipmentID,
            lt.recipe_id as recipeID,
            pd.name as equipment_name,
            lt.log_action,
            lt.log_time
        FROM
            log_times as lt
        INNER JOIN
            physical_devices as pd
        ON lt.equip_id = pd.id
        WHERE
            lt.log_time >= $1 AND lt.log_time <= $2 AND log_action = $3 AND lt.equip_id = $4
      `,
        [start, end, startOrStop, equipmentId[i]]
      );
      let x = rows.length;
      let y = (rows.length / totalDataLength) * 100;
      console.log(rows);
      if (y != 0) {
        tempArr.push({
          x: x,
          y: Math.round(y),
          equipmentName: rows[0].equipment_name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return tempArr;
};

module.exports.getAllEquipmentStartOrStop = async function (
  start,
  end,
  startOrStop
) {
  try {
    const { rows } = await pool.query(
      `
      SELECT
          lt.equip_id as equipmentID,
          lt.recipe_id as recipeID,
          pd.name as equipment_name,
          lt.log_action,
          lt.log_time
      FROM
          log_times as lt
      INNER JOIN
          physical_devices as pd
      ON lt.equip_id = pd.id
      WHERE
          lt.log_time >= $1 AND lt.log_time <= $2 AND log_action = $3
    `,
      [start, end, startOrStop]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAnomolies = async function (start, end, equipmentId) {
  let anomoliesArr = [];
  let anomoliesX = 0;
  let tempTotalY = 0;
  let startRows = null;
  let endRows = null;
  for (let i = 0; i < equipmentId.length; i++) {
    try {
      const { rows } = await pool.query(
        `
        SELECT
            lt.equip_id as equipmentID,
            lt.recipe_id as recipeID,
            pd.name as equipment_name,
            lt.log_action,
            lt.log_time
        FROM
            log_times as lt
        INNER JOIN
            physical_devices as pd
        ON lt.equip_id = pd.id
        WHERE
            lt.log_time >= $1 AND lt.log_time <= $2 AND log_action = 1 AND lt.equip_id = $3
      `,
        [start, end, equipmentId[i]]
      );
      
      startRows = rows;
    } catch (error) {
      console.log(error);
    }

    try {
      const { rows } = await pool.query(
        `
        SELECT
            lt.equip_id as equipmentID,
            lt.recipe_id as recipeID,
            pd.name as equipment_name,
            lt.log_action,
            lt.log_time
        FROM
            log_times as lt
        INNER JOIN
            physical_devices as pd
        ON lt.equip_id = pd.id
        WHERE
            lt.log_time >= $1 AND lt.log_time <= $2 AND log_action = 2 AND lt.equip_id = $3
      `,
        [start, end, equipmentId[i]]
      );
      
      endRows = rows;
    } catch (error) {
      console.log(error);
    }

    if (startRows.length > endRows.length) {
      anomoliesX = startRows.length - endRows.length;
      tempTotalY += anomoliesX;
      anomoliesArr.push({x: anomoliesX, equipmentName: startRows[i].equipment_name})
    }
  }
  
  for (let j = 0; j < anomoliesArr.length; j++) {
    anomoliesArr[j].y = (anomoliesArr[j].x / tempTotalY) * 100;
  }

  console.log(anomoliesArr);

  return anomoliesArr;
};
