import { useSelector, useDispatch } from 'react-redux';
import { updatePreferences } from '../../features/user/userSlice';
import Section from '../../components/Section/Section';
import Div from '../../components/Div/Div';
import Heading  from '../../components/Heading/Heading';

export default function Settings() {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.user.preferences);

  const handlePreferencesChange = (key, value) => {
    dispatch(updatePreferences({
      [key]: value
    }));
  };

  return (
    <Section>
      <Heading>User Preferences</Heading>

      <Div>
        <label htmlFor="postsPerPage">Posts Per Page:</label>
        <select
          id="postsPerPage"
          value={preferences.postsPerPage}
          onChange={(e) => handlePreferencesChange('postsPerPage', parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </Div>

      <Div>
        <label htmlFor="defaultSort">Default Sort:</label>
        <select
          id="defaultSort"
          value={preferences.defaultSort}
          onChange={(e) => handlePreferencesChange('defaultSort', e.target.value)}
        >
          <option value="hot">Hot</option>
          <option value="new">New</option>
          <option value="top">Top</option>
          <option value="rising">Rising</option>
          <option value="controversial">Controversial</option>
        </select>
      </Div>
    </Section>
  )

}