import { ScrollView } from 'react-native';
import { tw } from 'src/theme';
import { TaskHomeLinks } from '../components/TaskHomeLinks';
import { TaskListPresenterProvider } from '../hooks/useTaskListPresenter';

export const TaskHomeScreen = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`py-4`}>
      <TaskListPresenterProvider>
        <TaskHomeLinks />
      </TaskListPresenterProvider>
    </ScrollView>
  );
};
