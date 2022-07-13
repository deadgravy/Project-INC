const pool = require('../config/database');

// const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
module.exports.getData1 = async function () {
  try {
    const { rows } = await pool.query(`SELECT 
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
                        ON rf.id = t.fr_process_steps
                        INNER JOIN recipes r
                        ON r.id = rf.fr_recipe_id
                        INNER JOIN process_steps ps
                        ON ps.id = rf.fr_process_step
                        GROUP BY fr_recipe_id, r.name, rf.queue, fr_process_steps, ps.process_name, rf.desc_translate;
        `); // end of SQL query
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getRecipebyRecipeID = async function (id) {
  console.log(id + 'testing');
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

module.exports.getCompletedProducts = async function () {
  try {
    const { rows } =
      await pool.query(
      `
      SELECT lt.recipe_id, rp.name, COUNT(*) AS batchesCompleted
      FROM log_times lt
      INNER JOIN recipes rp
      ON lt.recipe_id = rp.id
      INNER JOIN recipe_flows AS rf
      ON lt.recipe_id = rf.fr_recipe_id
      WHERE lt.log_time BETWEEN '2021-08-21 00:00:00' AND '2021-08-21 08:00:00'
      AND rf.queue = 1
      AND lt.log_action = 2
      GROUP BY lt.recipe_id, rf.id, rp.name, rf.queue, rf.id
      ORDER BY lt.recipe_id;
      `);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProductsToComplete = async function () {
  try {
    const { rows } =
      await pool.query(
      `
      SELECT lt.recipe_id, rp.name, COUNT(*) AS batchesToComplete
      FROM log_times lt
      INNER JOIN recipes rp
      ON lt.recipe_id = rp.id
      INNER JOIN recipe_flows AS rf
      ON lt.recipe_id = rf.fr_recipe_id
      WHERE lt.log_time BETWEEN '2021-08-21 00:00:00' AND '2021-08-21 23:59:59'
      AND rf.queue = 1
      AND lt.log_action = 2
      GROUP BY lt.recipe_id, rf.id, rp.name, rf.queue, rf.id
      ORDER BY lt.recipe_id;
      `);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMachineConnectivity = async function () {
  try {
    const { rows } = 
      await pool.query(`
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
      `)
      return rows;
  } catch (error) {
    console.log(error)
  }
}
