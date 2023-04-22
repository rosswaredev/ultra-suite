import { ScrollView, ViewProps } from 'react-native';
import { tw } from 'src/theme';
import { TaskHomeLinks } from '../components/TaskHomeLinks';
import { TaskListPresenterProvider } from '../hooks/useTaskListPresenter';

export const TaskHomeScreen = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`py-4`}>
      <TaskListPresenterProvider>
        <TaskHomeLinks />
        {/* <Skeleton width={200} height={64} colorMode="dark" /> */}
      </TaskListPresenterProvider>
    </ScrollView>
  );
};
