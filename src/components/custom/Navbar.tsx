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
}

const Crumb = ({ loc }: CrumbProps) => {
	const path = loc.pathname.split('/');
	const isMobile = useIsMobile();
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<div className={isMobile ? 'flex items-center' : 'flex items-center space-x-2'}>
					<BreadcrumbItem>
						<BreadcrumbLink href={`/${path[0]}`}>Home</BreadcrumbLink>
					</BreadcrumbItem>
					{loc.pathname === '/' ? null : <BreadcrumbSeparator />}
					{path
						.filter((item) => item !== '')
						.map((i) => (
							<div key={i}>
								<BreadcrumbItem>
									<BreadcrumbPage>{i.at(0)?.toLocaleUpperCase() + i.slice(1)}</BreadcrumbPage>
								</BreadcrumbItem>
							</div>
						))}
				</div>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export const Navbar = () => {
	const loc = useLocation();
	return (
		<div className="grid grid-cols-3 font-mono text-center text-md">
			<div className="self-center px-3 col-span-1">
				<Crumb loc={loc} />
			</div>
			<span className="mx-auto self-center col-span-1">Henry Ouellette</span>
			<div className="col-span-1">
				<ThemeDropdown />
			</div>
		</div>
	);
};
