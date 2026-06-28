import { Code } from 'bright';
import draculaTheme from './dracula-theme.json';

export default function CodeSnippet(props: React.ComponentProps<typeof Code>) {
  return (
    <Code
      {...props}
      theme={draculaTheme}
      className="rounded-lg overflow-x-auto"
    />
  );
}
