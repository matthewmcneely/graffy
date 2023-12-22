var data = {
    "data": {
      "queryEvent": [
        {
          "id": "0x5",
          "name": "SqueezeFest 2024",
          "description": "Britain's Preeminent Accordion Festival",
          "start": "2024-06-01T00:00:00Z",
          "end": "2020-06-01T00:00:00Z",
          "type": "festival",
          "group": "Event",
          "account": {
            "id": "0x4",
            "name": "Acme Events",
            "group": "Account"
          },
          "site": {
            "id": "0xc",
            "name": "Daresbury Estate",
            "group": "Site",
            "dimensions": {
              "coordinates": [
                {
                  "points": [
                    {
                      "latitude": 53.3404374,
                      "longitude": -2.6231562
                    },
                    {
                      "latitude": 53.3400787,
                      "longitude": -2.6200663
                    },
                    {
                      "latitude": 53.3455489,
                      "longitude": -2.6171051
                    },
                    {
                      "latitude": 53.3459204,
                      "longitude": -2.6202165
                    },
                    {
                      "latitude": 53.3404374,
                      "longitude": -2.6231562
                    }
                  ]
                }
              ]
            },
            "structures": [
              {
                "id": "0x6",
                "name": "Stage",
                "group": "Structure",
                "capacity": 20,
                "sensors": [
                  {
                    "id": "0x8",
                    "name": "Stage Electricity",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_ELECTRICITY"
                    ]
                  },
                  {
                    "id": "0xd",
                    "name": "Stage Headcount",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_HEADCOUNT"
                    ]
                  },
                  {
                    "id": "0x14",
                    "name": "Stage Temp #1",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_TEMP"
                    ]
                  }
                ],
                "description": "Main Stage"
              }
            ],
            "areas": [
              {
                "id": "0xe",
                "name": "General Seating",
                "group": "Area",
                "description": null,
                "capacity": 1500,
                "centre": {
                  "latitude": 53.3430893,
                  "longitude": -2.6199804
                },
                "inBoundary": {
                  "name": "Daresbury Estate"
                },
                "sensors": [
                  {
                    "id": "0x2",
                    "name": "Seating CO2",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_CO2"
                    ]
                  },
                  {
                    "id": "0x9",
                    "name": "Seating Temp #1",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_TEMP"
                    ]
                  },
                  {
                    "id": "0xf",
                    "name": "Seating Headcount",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_HEADCOUNT"
                    ]
                  },
                  {
                    "id": "0x10",
                    "name": "Seating Air Quality",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_AIR_QUALITY"
                    ]
                  },
                  {
                    "id": "0x15",
                    "name": "Seating Humidity #1",
                    "group": "Sensor",
                    "capabilities": [
                      "MEASURE_HUMIDITY"
                    ]
                  }
                ]
              }
            ],
            "sensors": []
          }
        }
      ]
    },
    "extensions": {
      "touched_uids": 56,
      "tracing": {
        "version": 1,
        "startTime": "2023-12-19T21:55:28.708897649Z",
        "endTime": "2023-12-19T21:55:28.712178293Z",
        "duration": 3280644,
        "execution": {
          "resolvers": [
            {
              "path": [
                "queryEvent"
              ],
              "parentType": "Query",
              "fieldName": "queryEvent",
              "returnType": "[Event]",
              "startOffset": 304704,
              "duration": 2969940,
              "dgraph": [
                {
                  "label": "query",
                  "startOffset": 545908,
                  "duration": 2726136
                }
              ]
            }
          ]
        }
      }
    }
  }