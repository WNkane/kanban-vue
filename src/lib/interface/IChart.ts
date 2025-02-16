interface accumulator {[key: string]: number;}
interface pieChart {chart: {type:string};
                    title:{text:string};
                    series:{name:string,
                            colorByPoint:boolean,
                            data: pieData[]}[];
                    };           
interface pieData {name: string; y: number;}