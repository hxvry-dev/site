interface EXP {
	label: string;
	imageSlug: string;
	jobTitle: string;
	jobDescription: string;
	companyName: string;

	startDate: Date;
	endDate: Date;
}

const Experience: Array<EXP> = [
	{
		label: 'exp-1',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE',
		jobDescription: 'Job Description',
		companyName: 'Company',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2010'),
	},
	{
		label: 'exp-2',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE-2',
		jobDescription: 'Job Description 2',
		companyName: 'Company 2',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2020'),
	},
];

export default Experience;
