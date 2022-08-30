import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import CloseIcon from '@mui/icons-material/Close';
import './styles/container.css';
import './styles/modal.css';
import { flexbox } from '@mui/system';

const colors = ['#22C55E', '#8C0014'];
const boxSize = 500;

const DonutChart = ({ data1, data2 }) => {
  //data1 is batches completed and data2 is batchestocomplete
  const ref = useRef(null);
  const containerChartRef = useRef(null);
  const [completed, setCompleted] = useState(0);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const hasMounted = useRef(false);
  var count = 0;
  var count2 = 1;
  var value = [{ value: 0 }, { value: 100 }];

  useEffect(() => {
    if (data2 !== null && !hasMounted.current) {
      d3.select(ref.current).select('svg').remove(); // Remove the old svg

      for (var i = 0; i < data2?.data.length; i++) {
        // Create new svg
        const svg = d3
          .select(ref.current)
          .style('display', 'flex')
          .style('flex-direction', 'row')
          .style('flex-shrink', 0)
          .style('position', 'relative')
          // .style("overflow", "scroll")
          .append('div') // Wrap a div element in each svg eg. each pie chart
          .attr('id', `${data2?.data[i].recipe_id}`) // assign each div with an id so we can select it later
          .append('svg')
          .attr('preserveAspectRatio', 'xMidYMid meet')
          .attr('height', '130%')
          .attr('width', '130%')
          .attr('viewBox', `0 0 ${boxSize} ${boxSize}`)
          .append('g')
          .attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);

        const arcGenerator = d3.arc().innerRadius(160).outerRadius(220);
        var data1ID = data1?.data[count]?.recipe_id;
        var data2ID = data2?.data[i]?.recipe_id;
        if (data1ID !== data2ID) {
          //Check if recipeIDs match

          const pieGenerator = d3.pie().value((d) => d.value);

          const arcs = svg.selectAll().data(pieGenerator(value)).enter();

          //recipe label
          const recipe = svg
            .append('g')
            .attr('text-anchor', 'middle')
            .attr('class', 'bar-header')
            .attr('font-weight', 900)
            .style('font-size', '2.5em')
            .attr('name', `chart${i}`)
            .append('text');

          recipe.append('tspan').text(data2?.data[i].name);

          recipe
            .append('tspan')
            .attr('x', 0)
            .attr('dy', '1.6em')
            .style('font-size', '0.8em')
            .attr('font-weight', 600)
            .text('0/' + data2?.data[i].batchestocomplete);

          arcs
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (d, i) => colors[i % data1?.value.length]);
        } else {
          var value3 = [
            { value: data1?.data[count].batchescompleted },
            {
              value:
                data2?.data[i].batchestocomplete -
                data1?.data[count].batchescompleted,
            },
          ];

          const pieGenerator = d3
            .pie()
            .sort(null)
            .value((d) => d.value);

          const arcs = svg.selectAll().data(pieGenerator(value3)).enter();

          //recipe label
          const recipe = svg
            .append('g')
            .attr('text-anchor', 'middle')
            .attr('class', 'bar-header')
            .attr('font-weight', 900)
            .style('font-size', '2.5em')
            .attr('name', `chart${i}`)
            .append('text');

          recipe.append('tspan').text(data2?.data[i].name);

          recipe
            .append('tspan')
            .attr('x', 0)
            .attr('dy', '1.6em')
            .style('font-size', '0.8em')
            .attr('font-weight', 600)
            .text(
              data1?.data[count].batchescompleted +
                '/' +
                data2?.data[i].batchestocomplete
            );

          if (
            data1?.data[count].batchescompleted /
              data2?.data[i].batchestocomplete ==
            1
          ) {
            setCompleted(count2++);
          }

          arcs
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (d, i) => colors[i % data1?.value.length]);

          count++;
        }
      }

      return () => {
        hasMounted.current = true;
      };
    }
  }, []);

  const onProductSelect = (id) => {
    const containerChartEle = containerChartRef.current; // Parent div of the pie charts
    const productEle = document.getElementById(id); // get the selected pie chart(div)
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll
    containerChartEle.scrollTo({
      left: productEle.offsetLeft,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className='allProducts' style={{ width: 170 }}>
        <button onClick={toggleModal} className='btn-modal'>
          All Products
        </button>
      </div>
      {modal && (
        <div className=''>
          <div onClick={toggleModal} className='overlay'>
            <div className='modal-content'>
              <h4>Products to be completed today:</h4>
              {data2.data.map((recipe) => (
                <button
                  key={recipe.recipe_id}
                  onClick={() => onProductSelect(recipe.recipe_id)}
                >
                  {recipe.name}
                </button>
              ))}
              <button className='close-modal' onClick={toggleModal}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='row1'>
        <div className='productStatus'>
          <p style={{ display: 'flex' }}>
            <span style={{ color: '#22C55E', marginRight: 10 }}>
              {completed}
            </span>
            Completed
          </p>
          <p style={{ marginLeft: 20, display: 'flex' }}>
            <span style={{ color: '#8C0014', marginRight: 10 }}>
              {data2?.data.length - completed}
            </span>
            In Production
          </p>
        </div>
      </div>
      <div ref={containerChartRef} className='containerChart'>
        <div className='graph' ref={ref} />
      </div>
    </>
  );
};

export default React.memo(DonutChart);
