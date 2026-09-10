import { PortfolioData } from '../types';
import { portfolioDataKo } from './portfolioDataKo';
import { portfolioDataEn } from './portfolioDataEn';

export { portfolioDataKo, portfolioDataEn };

// Default initial data is KR (Korean)
export const initialPortfolioData: PortfolioData = portfolioDataKo;
