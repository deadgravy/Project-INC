const pool = require('../config/database');

  module.exports.getCompletedProducts = async function (
    date
    ) {
    const fromDate = date + ' 00:00:00';
    const toDate = date + ' 08:00:00';
    try {
      const { rows } = await pool.query(
        `
        SELECT lt.recipe_id, rp.name, COUNT(*) AS batchesCompleted
        FROM log_times lt
        INNER JOIN recipes rp
        ON lt.recipe_id = rp.id
        INNER JOIN recipe_flows AS rf
        ON lt.recipe_id = rf.fr_recipe_id
        WHERE lt.log_time BETWEEN $1 AND $2
        AND rf.queue = 1
        AND lt.log_action = 2
        GROUP BY lt.recipe_id, rf.id, rp.name, rf.queue, rf.id
        ORDER BY lt.recipe_id;
        `,
        [fromDate, toDate]
      );
  
      return rows;
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports.getProductsToComplete = async function (date) {
    const fromDate = date + ' 00:00:00';
    const toDate = date + ' 23:59:59';
    try {
      const { rows } = await pool.query(
        `
        SELECT lt.recipe_id, rp.name, COUNT(*) AS batchesToComplete
        FROM log_times lt
        INNER JOIN recipes rp
        ON lt.recipe_id = rp.id
        INNER JOIN recipe_flows AS rf
        ON lt.recipe_id = rf.fr_recipe_id
        WHERE lt.log_time BETWEEN $1 AND $2
        AND rf.queue = 1
        AND lt.log_action = 2
        GROUP BY lt.recipe_id, rf.id, rp.name, rf.queue, rf.id
        ORDER BY lt.recipe_id;
        `,
        [fromDate, toDate]
      );
  
      return rows;
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports.getSingleEquipmentStatus = async function (date) {
    const fromDate = date + ' 00:00:00';
    const toDate = date + ' 08:00:00';
    try {
      const { rows } =
        await pool.query(`SELECT lt.id, pd.id AS equipid, pd.name, r.name AS productName, t.fr_process_steps, lt.log_time, pd.mac_property AS singleOrMultiple, lt.log_action, ($2 - lt.log_time) AS timeToStarted, rf.queue, ps.process_name, rf.desc_translate, AVG(t.duration)
        FROM ( SELECT  equip_id,
        log_action,
        fr_process_steps,
        start_log_time,
        end_log_time,
        end_log_time - start_log_time AS duration
        FROM    (   SELECT  equip_id,
        log_action,
        fr_process_steps,
        log_time AS start_log_time,
        (   SELECT  MIN(log_time)
        FROM    (SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
        UNION ALL
        SELECT null, mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) T2
        WHERE   T2.fr_process_steps = T1.fr_process_steps
        AND     T2.log_action = 2
        AND     T2.log_time > T1.log_time
        ) AS end_log_time
        FROM    (     SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
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
        INNER JOIN log_times lt
        ON lt.recipe_id = rf.fr_recipe_id
        INNER JOIN physical_devices pd
        ON t.equip_id = pd.id
        WHERE lt.log_time BETWEEN $1 AND $2
        AND pd.mac_property = 1
        AND t.equip_id IS NOT NULL
        GROUP BY pd.id, r.name, rf.queue, t.fr_process_steps, ps.process_name, rf.desc_translate, pd.name, lt.log_action, fr_recipe_id, lt.log_time, t.equip_id, t.log_action, pd.mac_property, lt.id
        ORDER BY t.equip_id, fr_recipe_id, lt.log_time;
        `,
        [fromDate, toDate]
        );
  
      return rows;
    } catch (error) {
      console.log(error);
    } 
  };
  
  module.exports.getMultiEquipmentStatus = async function (date) {
    const fromDate = date + ' 00:00:00';
    const toDate = date + ' 08:00:00';
    try {
      const { rows } =
        await pool.query(`SELECT lt.id, pd.id AS equipid, pd.name, r.name AS productName, t.fr_process_steps, lt.log_time, pd.mac_property AS singleOrMultiple, lt.log_action, ($2 - lt.log_time) AS timeToStarted, rf.queue, ps.process_name, rf.desc_translate, AVG(t.duration)
        FROM ( SELECT  equip_id,
        log_action,
        fr_process_steps,
        start_log_time,
        end_log_time,
        end_log_time - start_log_time AS duration
        FROM    (   SELECT  equip_id,
        log_action,
        fr_process_steps,
        log_time AS start_log_time,
        (   SELECT  MIN(log_time)
        FROM    (SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
        UNION ALL
        SELECT null, mlt.work_type, mlt.action, mlt.log_time::timestamp FROM manual_log_times mlt) T2
        WHERE   T2.fr_process_steps = T1.fr_process_steps
        AND     T2.log_action = 2
        AND     T2.log_time > T1.log_time
        ) AS end_log_time
        FROM    (     SELECT lt.equip_id, lt.fr_process_steps, lt.log_action, lt.log_time::timestamp FROM log_times lt
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
        INNER JOIN log_times lt
        ON lt.recipe_id = rf.fr_recipe_id
        INNER JOIN physical_devices pd
        ON t.equip_id = pd.id
        WHERE lt.log_time BETWEEN $1 AND $2
        AND pd.mac_property = 2
        AND t.equip_id IS NOT NULL
        GROUP BY pd.id, r.name, rf.queue, t.fr_process_steps, ps.process_name, rf.desc_translate, pd.name, lt.log_action, fr_recipe_id, lt.log_time, t.equip_id, t.log_action, pd.mac_property, lt.id
        ORDER BY t.equip_id, fr_recipe_id, lt.log_time;
        `,
        [fromDate, toDate]
        );
  
      return rows;
    } catch (error) {
      console.log(error);
    } 
  };