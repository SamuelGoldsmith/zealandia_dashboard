'use client';

import { TimelineLayout } from "@/components/custom/timeline-layout";

export default function KMTK() {
  return (
      <div className="flex flex-row w-full justify-between p-2">
        <TimelineLayout
            className={'shadow-black'}
            connectorColor={'accent'}
            iconColor={'accent'}
            items={[
              {
                id: '1',
                date: '1874',
                title: 'Roto Kawau',
                description: 'Eurasian perch (Perca fluviatilis) were first introduced to Roto Kawau in 1874 for recreational fishing. This invasive species dominated the aquatic ecosystem and harmed native biodiversity.',
              },
              {
                id: '2',
                date: '2007',
                title: 'Roto Kawau',
                description: 'Boat electrofishing and netting techniques removed 3946 Eurasian perch from Roto Kawau (22% of the total estimated perch biomass).',
              }
            ]}
        />
          {/* Add images related to the timeline here */}
        <p>This is where images will go</p>

      </div>

  );
}
