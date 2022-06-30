const { Client } = require('pg');

// const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
module.exports.getData1 = async function () {
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'firc_v3',
  });

  client.connect();
  try {
    const { rows } = await client.query(`SELECT 
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

module.exports.getRecipebyRecipeID = async function () {
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'firc_v3',
  });

  client.connect();
  try {
    const { rows } = await client.query(`SELECT 
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
                        ON rf.id = t.fr_process_steps and rf.fr_recipe_id = 53
                        INNER JOIN recipes r
                        ON r.id = rf.fr_recipe_id
                        INNER JOIN process_steps ps
                        ON ps.id = rf.fr_process_step
                        GROUP BY fr_recipe_id, r.name, rf.queue, fr_process_steps, ps.process_name, rf.desc_translate;
                        `); // end of sql query
    return rows;
  } catch (error) {
    console.log(error);
  }
};
