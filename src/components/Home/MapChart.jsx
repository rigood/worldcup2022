import { useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const markers = [
  {
    markerOfffset: -10,
    name: "카타르 도하",
    coordinates: [51.534817, 25.286106],
  },
  {
    markerOfffset: -10,
    name: "대한민국 서울",
    coordinates: [126, 37],
  },
];

function MapChart() {
  const [country, setCountry] = useState("");

  return (
    <Wrapper>
      {country && (
        <ReactTooltip backgroundColor="#8d1b3d">{country}</ReactTooltip>
      )}
      <div>
        <ComposableMap
          data-tip=""
          onClick={(e) => {
            if (e.target.width) {
              setCountry(null);
            }
          }}
        >
          <ZoomableGroup center={[90, 30]} zoom={3}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={-1}
                    stroke={"#d6dee4"}
                    strokeWidth={0.5}
                    style={{
                      default: {
                        fill: "#e2e9ee",
                        outline: "none",
                      },
                      hover: {
                        fill: "#f8f0f2",
                        outline: "none",
                      },
                      pressed: {
                        outline: "red",
                      },
                    }}
                    onMouseEnter={() => setCountry(geo.properties.name)}
                    onMouseLeave={() => setCountry("")}
                  />
                ))
              }
            </Geographies>
            {markers.map((marker) => {
              const { name, coordinates, markerOfffset } = marker;
              return (
                <Marker key={name} coordinates={coordinates}>
                  <circle r={4} fill="#8d1b3d" />
                  <text
                    y={markerOfffset}
                    textAnchor="middle"
                    style={{
                      fill: "black",
                      fontSize: "12px",
                      fontFamily: "GmarketSansMedium",
                    }}
                  >
                    {name}
                  </text>
                </Marker>
              );
            })}
            <Annotation
              subject={[51.490154, 25.420738]}
              dx={30}
              dy={30}
              connectorProps={{
                stroke: "#8d1b3d",
                strokeWidth: 1,
                strokeLinecap: "round",
              }}
            >
              <text
                x="73"
                y="8"
                fill="#8d1b3d"
                textAnchor="end"
                fontSize="8px"
                fontFamily="Pretendard-Regular"
                alignmentBaseline="middle"
              >
                {"Lusail Stadium (루사일 스타디움)"}
              </text>
            </Annotation>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </Wrapper>
  );
}

export default MapChart;

const Wrapper = styled.div`
  .rsm-svg:focus {
    outline: none !important;
  }
`;
