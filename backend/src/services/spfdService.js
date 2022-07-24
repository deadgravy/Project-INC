const Pool = require('../config/database');
 
module.exports.getSingleProductWithNameDate = async function (name,startDate,endDate) {
  try {
    const { rows } = await Pool.query(
      `WITH OMG as (
        SELECT
          log_times.id,
          log_times.equip_id,
          physical_devices.name as equip_name,
          log_times.recipe_id,
          recipes.name as recipe_name,
          log_times.log_action,
          LAG(log_times.log_time,1) OVER(ORDER BY log_times.id) start_time,
          log_times.log_time as end_time, DATE(log_times.log_time) as date
<<<<<<< HEAD
        FROM log_times
        INNER JOIN physical_devices
        ON log_times.equip_id = physical_devices.id
        INNER JOIN recipes ON log_times.recipe_id = recipes.id                
      )
      SELECT equip_name, recipe_name, start_time, end_time
      FROM OMG
      WHERE log_action = 2 AND recipe_name = $1 AND (date BETWEEN $2 and $3);`,
      [name,startDate,endDate]
    ); // end of query;
    return rows;
  } catch (error) {
    console.log(error);
  }
};
 
module.exports.getAllRecipeName = async function () {
  try {
    const { rows } = await Pool.query(
      `SELECT name FROM public.recipes`
    );
<<<<<<< HEAD
    return rows
  } catch (error) {
    console.log(error);
  }
};
 
 
 
module.exports.getSingleProductEquipment = async function (name,startDate,endDate) {
  try {
    const { rows } = await Pool.query(
      `WITH OMG as (
        SELECT
          log_times.id,
          log_times.equip_id,
          physical_devices.name as equip_name,
          log_times.recipe_id,
          recipes.name as recipe_name,
          log_times.log_action,
          LAG(log_times.log_time,1) OVER(ORDER BY log_times.id) start_time,
          log_times.log_time as end_time, DATE(log_times.log_time) as date
        FROM log_times
        INNER JOIN physical_devices
        ON log_times.equip_id = physical_devices.id
        INNER JOIN recipes ON log_times.recipe_id = recipes.id                
      )
      SELECT equip_name
      FROM OMG
      WHERE log_action = 2 AND recipe_name = $1 AND (date BETWEEN $2 and $3);`,
      [name,startDate,endDate]
    ); // end of query;
    return rows;
  } catch (error) {
    console.log(error);
  }
};
 
module.exports.getEquipmentUsageByName = async function (name,ename) {
  try {
    const { rows } = await Pool.query(
      `WITH MFK as (
        SELECT
         log_times.id,
         log_times.equip_id,
         physical_devices.name as equip_name,
         recipes.name as recipe_name,
         log_times.log_action,
         LAG(log_times.log_time,1) OVER(ORDER BY log_times.id) start_time,
         log_times.log_time as end_time, DATE(log_times.log_time) as date
        FROM log_times
        INNER JOIN physical_devices
        ON log_times.equip_id = physical_devices.id
        INNER JOIN recipes ON log_times.recipe_id = recipes.id  
      )
      SELECT date, ROUND(EXTRACT(EPOCH FROM -(start_time - end_time))/60) as total_time
      FROM MFK
      WHERE log_action = 2 AND recipe_name = $1 AND equip_name = $2`,
      [name,ename]
    ); // end of query;
=======
=======
       FROM log_times
       INNER JOIN physical_devices
       ON log_times.equip_id = physical_devices.id
      INNER JOIN recipes
      ON log_times.recipe_id = recipes.id
    )
<<<<<<< HEAD
    SELECT equip_id, equip_name, recipe_id, recipe_name, start_time, end_time, -(start_time - end_time) as duration, date 
    FROM OMG 
<<<<<<< HEAD
    WHERE log_action = 2 AND recipe_name = '$1' AND (date BETWEEN '$1' and '$1');`
=======
    WHERE log_action = 2 AND recipe_id = ?;`
>>>>>>> ac2a8846 (fix merge conflic)
=======
    SELECT equip_id, equip_name, recipe_id, recipe_name, start_time, end_time, -(start_time - end_time) as total_time, date 
    FROM OMG 
    WHERE log_action = 2 AND recipe_name = '$1' AND (date BETWEEN '$1' and '$1');`
>>>>>>> 4e5f1779 (Edited query)
    ); // end of SQL query
>>>>>>> df13f9f2 (resolve rebase conflics)
>>>>>>> 3c44cbff (fix rebase conflics)
    return rows;
  } catch (error) {
    console.log(error);
  }
};
