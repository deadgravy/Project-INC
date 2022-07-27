const Pool = require('../config/database');

// still in progress

module.exports.getSingleProductbyRecipeID = async function () {
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
        INNER JOIN recipes
        ON log_times.recipe_id = recipes.id
      )
      SELECT equip_id, equip_name, recipe_id, recipe_name, start_time, end_time, -(start_time - end_time) as total_time, date 
      FROM OMG 
      WHERE log_action = 2 AND recipe_name = '$1' AND (date BETWEEN '2021-08-10' and '2021-08-13');`
    ); // end of SQL query
    return rows;
  } catch (error) {
    console.log(error);
  }
};