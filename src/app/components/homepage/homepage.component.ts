import { ApplicationService } from 'src/app/components/application/application.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ChartComponent, ApexAxisChartSeries, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ApexFill, ApexLegend, ApexGrid, ApexMarkers, ApexAnnotations } from "ng-apexcharts";
import { BaseComponent } from 'src/app/base.component';
import { HomePageService } from './homepage.service';


export type ChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	responsive: ApexResponsive[];
	labels: any;
	seriesaxis: ApexAxisChartSeries;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	dataLabels: ApexDataLabels;
	plotOptions: ApexPlotOptions;
	yaxis: ApexYAxis;
	tooltip: ApexTooltip;
	colors: string[];
	title: ApexTitleSubtitle;
	subtitle: ApexTitleSubtitle;
	fill: ApexFill;
	legend: ApexLegend;
	grid: ApexGrid;
	markers: ApexMarkers;

};


@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.css']
})

export class HomepageComponent extends BaseComponent implements OnInit {
	@ViewChild("chart") chart: ChartComponent;
	public hajjAssociationChart: Partial<ChartOptions>;
	public hajjMenAndWomenChart: Partial<ChartOptions>;
	// public hajjLandingAirportChart: Partial<ChartOptions>;
	public hajjDepartureAirportChart: Partial<ChartOptions>;

	public umrahAssociationChart: Partial<ChartOptions>;
	public umrahMenAndWomenChart: Partial<ChartOptions>;
	// public umrahLandingAirportChart: Partial<ChartOptions>;
	public umrahDepartureAirportChart: Partial<ChartOptions>;

	public funeralFundPaidChart: Partial<ChartOptions>;
	public funeralFundUnpaidChart: Partial<ChartOptions>;
	public funeralFundDiedMemberChart: Partial<ChartOptions>;
	public funeralFundDebtorChart: Partial<ChartOptions>;
	public funeralFundAgeChart: Partial<ChartOptions>;

	hajjDepartureAirport: any[] = [];
	hajjLandingAirport: any[] = [];

	umrahDepartureAirport: any[] = [];
	umrahLandingAirport: any[] = [];

	activeUser: any;
	inactiveUser: any;
	totalUser: any;

	constructor(private homePageService: HomePageService, private applicationService: ApplicationService) {
		super();

	}

	ngOnInit(): void {
		this.hajj();
		this.umrah();
		this.user();
		this.funeralFund();

	}


	async user() {
		// await this.homePageService.getActiveUser().subscribe((data: any) => {
		// 	this.activeUser = data

		// })
		// await this.homePageService.getInactiveUser().subscribe((data: any) => {
		// 	this.inactiveUser = data

		// })
		await this.homePageService.getTotalUser().subscribe((data: any) => {
			this.totalUser = data

		})

	}

	async hajj() {


		await this.homePageService.getHajjPilgrimByAssociation().subscribe((data: any) => {

			this.hajjAssociationChart = {
				seriesaxis: [{
					name: "Kişi Sayısı",
					data: data.map((chart) => chart.count)
				}],
				chart: {
					height: 270,
					type: "bar",
				},
				colors: [

					"#D10CE8",
					"#008FFB",
					"#00E396",
					"#FEB019",
					"#FF4560",

				],
				plotOptions: {
					bar: {
						columnWidth: "45%",
						distributed: true
					}
				},
				dataLabels: {
					enabled: true,
					style: {
						colors: [
							"black"
						]
					}

				},
				grid: {
					show: false
				},
				xaxis: {
					categories: data.map((chart) => chart.association),
					labels: {
						style: {
							colors: [
								"#008FFB",
								"#00E396",
								"#FEB019",
								"#FF4560",
								"#775DD0",
								"#546E7A",
								"#26a69a",
								"#D10CE8"
							],
							fontSize: "14px"
						}
					}
				},
				responsive: [
					{
						breakpoint: 700,
						options: {
							chart: {
								height: 300,
							}
						}
					}

				]
			};

		})


		await this.homePageService.getHajjMenAndWomenCount().subscribe((data: any) => {
			this.hajjMenAndWomenChart = {
				seriesaxis: [
					{
						data: [data?.womencount, data?.mencount]
					}
				],
				chart: {
					type: "bar",
					height: 200
				},
				plotOptions: {
					bar: {
						barHeight: "100%",
						distributed: true,
						horizontal: true,
						dataLabels: {
							position: "bottom"
						}
					}
				},
				colors: [
					"#c13287",
					"#0417a7"
				],
				dataLabels: {
					enabled: true,
					textAnchor: "start",
					style: {
						colors: ["#fff"]
					},
					formatter: function (val, opt) {
						return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
					},
					offsetX: 0,
					dropShadow: {
						enabled: true
					}
				},
				stroke: {
					width: 0.5,
					colors: ["#fff"]
				},
				xaxis: {
					categories: [
						"Kadın",
						"Erkek"
					]
				},
				yaxis: {
					labels: {
						show: false
					}
				},
				tooltip: {
					theme: "dark",
					x: {
						show: false
					},
					y: {
						title: {
							formatter: function () {
								return "";
							}
						}
					}
				}
			};

		});


		await this.homePageService.getHajjPilgrimByDepartureAirport().subscribe((data: any) => {
			this.hajjDepartureAirportChart = {
				seriesaxis: [
					{
						name: "Kişi Sayısı",
						data: data.map(data => data.count)
					}
				],
				chart: {
					height: 250,
					type: "line",
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: "straight"
				},
				title: {
					text: "Product Trends by Month",
					align: "left"
				},
				grid: {
					row: {
						colors: ["#f3f3f3", "transparent"],
						opacity: 0.5
					}
				},
				xaxis: {
					categories: data.map(data => data.airport)
				}



			}

		});

		// await this.homePageService.getHajjPilgrimByLandingAirport().subscribe((data: any) => {

		// 	this.hajjLandingAirportChart = {
		// 		seriesaxis: [
		// 			{
		// 				name: "Kişi Sayısı",
		// 				data: data.map(data => data.count)
		// 			}
		// 		],
		// 		chart: {
		// 			height: 200,
		// 			type: "line",
		// 			zoom: {
		// 				enabled: false
		// 			}
		// 		},
		// 		dataLabels: {
		// 			enabled: false
		// 		},
		// 		stroke: {
		// 			curve: "straight"
		// 		},
		// 		title: {
		// 			text: "Product Trends by Month",
		// 			align: "left"
		// 		},
		// 		grid: {
		// 			row: {
		// 				colors: ["#f3f3f3", "transparent"],
		// 				opacity: 0.5
		// 			}
		// 		},
		// 		xaxis: {
		// 			categories: data.map(data => data.airport)
		// 		}

		// 	};

		// });

	}


	async umrah() {



		await this.homePageService.getUmrahMenAndWomenCount().subscribe((data: any) => {

			this.umrahMenAndWomenChart = {
				seriesaxis: [
					{
						data: [data?.womencount, data?.mencount]
					}
				],
				chart: {
					type: "bar",
					height: 200
				},
				plotOptions: {
					bar: {
						barHeight: "100%",
						distributed: true,
						horizontal: true,
						dataLabels: {
							position: "bottom"
						}
					}
				},
				colors: [
					"#c13287",
					"#0417a7"
				],
				dataLabels: {
					enabled: true,
					textAnchor: "start",
					style: {
						colors: ["#fff"]
					},
					formatter: function (val, opt) {
						return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
					},
					offsetX: 0,
					dropShadow: {
						enabled: true
					}
				},
				stroke: {
					width: 0.5,
					colors: ["#fff"]
				},
				xaxis: {
					categories: [
						"Kadın",
						"Erkek"
					]
				},
				yaxis: {
					labels: {
						show: false
					}
				},
				tooltip: {
					theme: "dark",
					x: {
						show: false
					},
					y: {
						title: {
							formatter: function () {
								return "";
							}
						}
					}
				}
			};

		});

		await this.homePageService.getUmrahPilgrimByAssociation().subscribe((data: any) => {
			this.umrahAssociationChart = {
				seriesaxis: [{
					name: "Kişi Sayısı",
					data: data.map((chart) => chart.count)
				}],
				chart: {
					height: 270,
					type: "bar",
				},
				colors: [

					"#D10CE8",
					"#008FFB",
					"#00E396",
					"#FEB019",
					"#FF4560",

				],
				plotOptions: {
					bar: {
						columnWidth: "45%",
						distributed: true
					}
				},
				dataLabels: {
					enabled: true,
					style: {
						colors: [
							"black"
						]
					}

				},
				legend: {
					show: false
				},
				grid: {
					show: false
				},
				xaxis: {
					categories: data.map((chart) => chart.association),
					labels: {
						style: {
							colors: [
								"#008FFB",
								"#00E396",
								"#FEB019",
								"#FF4560",
								"#775DD0",
								"#546E7A",
								"#26a69a",
								"#D10CE8"
							],
							fontSize: "14px"
						}
					}
				}
			};

		});




		await this.homePageService.getUmrahPilgrimByDepartureAirport().subscribe((data: any) => {
			this.umrahDepartureAirportChart = {
				seriesaxis: [
					{
						name: "Kişi Sayısı",
						data: data.map(data => data.count)
					}
				],
				chart: {
					height: 250,
					type: "line",
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: "straight"
				},
				title: {
					text: "Product Trends by Month",
					align: "left"
				},
				grid: {
					row: {
						colors: ["#f3f3f3", "transparent"],
						opacity: 0.5
					}
				},
				xaxis: {
					categories: data.map(data => data.airport)
				}

			};



		})

		// await this.homePageService.getUmrahPilgrimByLandingAirport().subscribe((data: any) => {
		// 	this.umrahLandingAirportChart = {
		// 		seriesaxis: [
		// 			{
		// 				name: "Kişi Sayısı",
		// 				data: data.map(data => data.count)
		// 			}
		// 		],
		// 		chart: {
		// 			height: 200,
		// 			type: "line",
		// 			zoom: {
		// 				enabled: false
		// 			}
		// 		},
		// 		dataLabels: {
		// 			enabled: false
		// 		},
		// 		stroke: {
		// 			curve: "straight"
		// 		},
		// 		title: {
		// 			text: "Product Trends by Month",
		// 			align: "left"
		// 		},
		// 		grid: {
		// 			row: {
		// 				colors: ["#f3f3f3", "transparent"],
		// 				opacity: 0.5
		// 			}
		// 		},
		// 		xaxis: {
		// 			categories: data.map(data => data.airport)
		// 		}

		// 	};


		// });

	}

	async funeralFund() {
		await this.homePageService.getPaidDebtors().subscribe((data) => {

			this.funeralFundPaidChart = {
				seriesaxis: [
					{
						name: "Toplam",
						data: data.map(data => data.count)
					}
				],
				chart: {
					height: 175,
					type: "bar",
				},
				colors: [

					"#D10CE8",
					"#008FFB",
					"#00E396",
					"#FEB019",
					"#FF4560",

				],
				plotOptions: {
					bar: {
						columnWidth: "45%",
						distributed: true
					}
				},
				dataLabels: {
					enabled: true,
					style: {
						colors: [
							"black"
						]
					}

				},
				legend: {
					show: false
				},
				grid: {
					show: false
				},
				xaxis: {
					categories: data.map(data => data.name),
					labels: {
						style: {
							colors: [
								"#008FFB",
								"#00E396",
								"#FEB019",
								"#FF4560",
								"#775DD0",
								"#546E7A",
								"#26a69a",
								"#D10CE8"
							],
							fontSize: "14px"
						}
					}
				},
				responsive: [
					{
						breakpoint: 700,
						options: {
							chart: {
								height: 300,
							}
						}
					}

				]
			};


		})

		await this.homePageService.getUnpaidDebtors().subscribe((data) => {
			this.funeralFundUnpaidChart = {
				seriesaxis: [
					{
						name: "Toplam",
						data: data.map(data => data.count)
					}
				],
				chart: {
					height: 175,
					type: "bar",

				},
				colors: [
					"#775DD0",
					"#546E7A",
					"#26a69a",
					"#D10CE8",
					"#008FFB",
					"#00E396",
					"#FEB019",
					"#FF4560",

				],
				plotOptions: {
					bar: {
						columnWidth: "45%",
						distributed: true
					}
				},
				dataLabels: {
					enabled: true,
					style: {
						colors: [
							"black"
						]
					}

				},
				legend: {
					show: false
				},
				grid: {
					show: false
				},
				xaxis: {
					categories: data.map(data => data.name),
					labels: {
						style: {
							colors: [
								"#008FFB",
								"#00E396",
								"#FEB019",
								"#FF4560",
								"#775DD0",
								"#546E7A",
								"#26a69a",
								"#D10CE8"
							],
							fontSize: "14px"
						}
					}
				}, responsive: [
					{
						breakpoint: 700,
						options: {
							chart: {
								height: 300,
							}
						}
					}

				]
			};


		})

		await this.homePageService.getDiedMember().subscribe((data) => {
			this.funeralFundDiedMemberChart = {
				seriesaxis: [
					{
						name: "Kişi Sayısı",
						data: data.map(data => data.count)
					}
				],
				chart: {
					height: 200,
					type: "line",
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: "straight"
				},
				title: {
					text: "Product Trends by Month",
					align: "left"
				},
				grid: {
					row: {
						colors: ["#f3f3f3", "transparent"],
						opacity: 0.5
					}
				},
				xaxis: {
					categories: data.map(data => data.year)
				}

			}
		})

		await this.homePageService.getDebtorsIncomeByYear().subscribe((data) => {
			this.funeralFundDebtorChart = {
				seriesaxis: [
					{
						name: "Toplam Gelir",
						data: data.map(data => data.income)
					}
				],

				chart: {
					type: "area",
					height: 240,
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: "straight"
				},
				markers: {
					size: 6,
					hover: {
						size: 10
					}
				},
				title: {
					text: "Fundamental Analysis of Stocks",
					align: "left"
				},
				subtitle: {
					text: "Price Movements",
					align: "left"
				},
				labels: data.map(data => data.year),
				xaxis: {
					type: "category"
				},
				yaxis: {
					opposite: true
				},
				legend: {
					horizontalAlign: "left"
				}
			};

		})

	}
}
