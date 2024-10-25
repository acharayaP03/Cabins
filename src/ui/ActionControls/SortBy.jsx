import { useSearchParams } from 'react-router-dom';
import Select from '../FormComponent/Select';

function SortBy({ options }) {
	const [searchParams, setSearchParms] = useSearchParams();
	const defaultSelect = searchParams.get('sortBy') || '';

	const handleChange = (e) => {
		searchParams.set('sortBy', e.target.value);
		setSearchParms(searchParams);
	};
	return <Select options={options} type='white' onChange={handleChange} value={defaultSelect} />;
}

export default SortBy;
