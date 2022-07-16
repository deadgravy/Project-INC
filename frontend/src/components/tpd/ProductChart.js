import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import './styles/container.css'

const colors = ["#22C55E", "#8C0014"];
const boxSize = 500;

const DonutChart = ({ data1, data2 }) => { //data1 is batches completed and data2 is batchestocomplete
  const ref = useRef(null);
  const hasMounted = useRef(false);
  var count = 0;
  var value = [{ value: 0}, { value: 100}];

  useEffect(() => {

    if (data2 !== null && !hasMounted.current) {

      d3.select(ref.current).select("svg").remove(); // Remove the old svg

      for (var i = 0; i < data2?.data.length; i++) {

      // Create new svg
        const svg = d3
          .select(ref.current)
          .style('display', 'flex')
          .style('flex-direction', 'row')
          .style('flex-shrink', 0)
          .append("svg")
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("height", "130%")
          .attr("width", "130%")
          .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
          .append("g")
          .attr("transform", `translate(${boxSize/2}, ${boxSize/2})`);

        const arcGenerator = d3.arc().innerRadius(160).outerRadius(220);

        if(data1?.data[count].recipe_id != data2?.data[i].recipe_id){ //Check if recipeIDs match

        const pieGenerator = d3.pie().value((d) => d.value);

        const arcs = svg.selectAll().data(pieGenerator(value)).enter();

        //recipe label
        const recipe = svg
          .append("g")
          .attr("text-anchor", "middle")
          .attr("class", "bar-header")
          .attr("font-weight", 900)
          .style("font-size", "2.5em")
          .append("text");

        recipe.append("tspan").text(data2?.data[i].name);

        recipe
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "1.6em")
          .style("font-size", "0.8em")
          .attr("font-weight", 600)
          .text("0/" + data2?.data[i].batchestocomplete);

        arcs
          .append("path")
          .attr("d", arcGenerator)
          .style("fill", (d, i) => colors[i % data1.value.length]);

        }else{

        var value3 = [{ value:data1?.data[count].batchescompleted}, { value: data2.data[i].batchestocomplete - data1?.data[count].batchescompleted}];

        const pieGenerator = d3.pie().sort(null).value((d) => d.value);

        const arcs = svg.selectAll().data(pieGenerator(value3)).enter();

          //recipe label
          const recipe = svg
          .append("g")
          .attr("text-anchor", "middle")
          .attr("class", "bar-header")
          .attr("font-weight", 900)
          .style("font-size", "2.5em")
          .append("text");
      
          recipe.append("tspan").text(data2?.data[i].name);
      
          recipe
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "1.6em")
            .style("font-size", "0.8em")
            .attr("font-weight", 600)
            .text(data1?.data[count].batchescompleted + "/" + data2?.data[i].batchestocomplete);
      
          arcs
            .append("path")
            .attr("d", arcGenerator)
            .style("fill", (d, i) => colors[i % data1.value.length]);
      
          count++;
        }
      }

      
      return () => {
        hasMounted.current = true;
      };
    }
  }, []);  

  return (
    <div className="container">
      <div className="graph" ref={ref} />
    </div>
  );
};

export default React.memo(DonutChart);
