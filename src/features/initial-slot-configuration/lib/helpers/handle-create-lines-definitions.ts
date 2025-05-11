import { CustomLinesDefinitions, LinesDefinitionsFor3x3 } from 'pokie';

export const handleCreateLinesDefinitions = () => {
  const linesDefinitions = new LinesDefinitionsFor3x3();
  const customLinesDefinitions = new CustomLinesDefinitions();
  customLinesDefinitions.setLineDefinition(
    '0',
    linesDefinitions.getLineDefinition('0'),
  );
  customLinesDefinitions.setLineDefinition(
    '1',
    linesDefinitions.getLineDefinition('1'),
  );
  customLinesDefinitions.setLineDefinition(
    '2',
    linesDefinitions.getLineDefinition('2'),
  );
  customLinesDefinitions.setLineDefinition(
    '3',
    linesDefinitions.getLineDefinition('3'),
  );
  customLinesDefinitions.setLineDefinition(
    '4',
    linesDefinitions.getLineDefinition('4'),
  );

  return customLinesDefinitions;
};
