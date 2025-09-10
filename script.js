import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './regiones_edit.geojson' with {type : 'json'}

const projection = d3.geoMercator()
.fitSize([400,400], data)

const path = d3.geoPath(projection)
d3.select('.mapa')
.attr ('transform','scale(15) translate(-90,-220)')
.selectAll('path')
.data(data.features)
.join('path')
.attr ('d', path)
.attr ('fill', 'white')
.attr('stroke-width',0.05)
.attr ('stroke', 'purple')

const cajaTexto= d3.select ('body').append('div')
    .classed ('cajaTexto', true)

d3.select ('.mapa').selectAll('path')
    .on('mouseenter', (e,d) => {
        cajaTexto.style('top', e.pageY + 5 + 'px')
        cajaTexto.style('left', e.pageX + 5 + 'px')
        cajaTexto.style ('opacity', 1.5)
        cajaTexto.html(`<p>${d.properties.Region}, femicidios:${d.properties.femicidios} <p>`)
    })
    .on('click', (e,d)=>{
        cajaTexto.html(`<p>${d.properties.Region}, femicidios frustrados: ${d.properties["femicidios frustrados"]}<p>`)
    })
    .on ('mouseout', (e,d) =>{
        cajaTexto.style('opacity', 0)
    })


