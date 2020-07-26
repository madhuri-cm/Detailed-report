import React from 'react'
import Chart from "react-apexcharts";
import './data.css'

class Data extends React.Component {
    constructor() {
        super()
        this.state = {
            data:[]
        }
    }

    componentDidMount () {
        fetch('data/customerdata.json')
        .then(function(response){
          return response.json()
        })
        .then((data)=>{
            this.setState({
                data:data
            })
        })
    }

     frequency =  () =>  {
         let result = {}
        for(const ele of this.state.data) {
            if(result.hasOwnProperty(ele.Name)) {
                result [ele.Name]  ++
            }
            else {
                result[ele.Name] = 1
            } 
        } 
        return result
    }

    render() {
        let result = this.state.data.reduce(function(tot, arr) { 
            return tot + parseInt(arr.Amount)
          },0);

            const array = this.frequency()
            const a = Object.entries(array)
            const b = a.filter(a => {
              return a[1] === 1
          })
            b.map(b=> {
                return(console.log(b[0]))
            })

         const values = Object.values(array)
         const orderedOnce = values.filter(value => value === 1)
         const orderedTwice = values.filter(value => value === 2)
         const orderedThrice = values.filter(value => value === 3)
         const orderedfourth = values.filter(value => value === 4)
         const orderedfifth = values.filter(value => value >= 5)

        const data = {
            options: {
                chart: {
                id: "basic-bar"
                },
                xaxis: {
                categories: [1, 2, 3, 4, 5]
                }
            },
            series: [
                {
                name: "series-1",
                data: [orderedOnce.length, orderedTwice.length,orderedThrice.length,orderedfourth.length,orderedfifth.length]
                }
            ]
        }
       
        return (
            <div className="container">
                 <section className="data-section">
                <div className="heading">
                <h2><center>DETAILED REPORT</center></h2>
                </div>
               <h2>Total Number of orders: {this.state.data.length}</h2>
              <h2>Total Amount of orders: {result}</h2>
              <div>
              <h2>List of Customers who ordered only once</h2>
              <ol>
              {
                b.map(b => {
                    return <li>{b[0]}</li>
                })
              }
              </ol>
              </div>
              
              
              <div>
              <h2>Distribution of customers based on orders</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>No. of Orders</th>
                            <th>Count of Customers</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{orderedOnce.length}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            {console.log(orderedTwice)}
                            <td>{orderedTwice.length}</td>
                            
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{orderedThrice.length}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{orderedfourth.length}</td>
                        </tr>

                        <tr>
                            <td>5+</td>
                            <td>{orderedfifth.length}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div >
                    <h2>Chart</h2>
                <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="500"
            />
            </div>
            </section>
            </div>
        )
    }
}

export default Data