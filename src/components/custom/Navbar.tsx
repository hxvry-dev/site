import { Location, useLocation } from 'react-router-dom';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';

import { ThemeDropdown } from './ThemeDropdown';

import { useIsMobile } from '@/hooks/use-mobile';

interface CrumbProps {
	loc: Location;
	isMobile: boolean;
}

const Crumb = ({ loc, isMobile }: CrumbProps) => {
	const path = loc.pathname.split('/').filter((item) => item !== '');
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<div className={isMobile ? 'flex items-center' : 'flex items-center space-x-2'}>
					<BreadcrumbItem>
						<BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
					</BreadcrumbItem>
					{loc.pathname === '/' ? null : <BreadcrumbSeparator />}
					{path.map((i, idx) => (
						<div className={isMobile ? 'flex items-center' : 'flex items-center space-x-2'} key={i}>
							<BreadcrumbItem>
								<BreadcrumbPage>{i.at(0)?.toLocaleUpperCase() + i.slice(1)}</BreadcrumbPage>
							</BreadcrumbItem>
							{idx < path.length - 1 && <BreadcrumbSeparator />}
						</div>
					))}
				</div>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export const Navbar = () => {
	const loc = useLocation();
	const isMobile = useIsMobile();

	return (
		<div className="flex flex-row justify-between mx-auto font-mono">
			<div className="self-center px-3 col-span-1">
				<Crumb loc={loc} isMobile={isMobile} />
			</div>
			<div className="col-span-1">
				<ThemeDropdown />
			</div>
		</div>
	);
};
