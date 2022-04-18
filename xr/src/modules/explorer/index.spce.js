import * as React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Explorer from './index'

describe('Component: Explorer', () => {
    // it('should render Explorer UI', () => {
    //     render(<Explorer />);

    //     expect(screen.getByText(/root/i)).toBeDefined();

    //     expect(screen.getByText(/File/i)).toBeDefined();
    //     expect(screen.getByText(/Child count/i)).toBeDefined();
    //     expect(screen.getByText(/Last Modified/i)).toBeDefined();

    //     expect(screen.getByText(/no rows found/i)).toBeDefined();
    // });

    it('should render Explorer UI', () => {
        const loadData = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        '': {
                            fullName: '',
                            name: '',
                            type: 'Folder',
                            childCount: 1,
                            load: true,
                            children: [
                                {
                                    fullName: 'playback/',
                                    name: 'playback',
                                    childCount: 2,
                                    lastModifiedTimestamp: 1636347568000,
                                    type: 'Folder',
                                    children: [],
                                    load: false,
                                },
                            ],
                            file: [],
                        },
                    })
                }, 500)
            })
        }

        render(
            <Explorer
                handleFileContextMenu={(e, recordId) => {}}
                handleFileClick={recordId => {}}
                handleFileInfoBtnClick={recordId => {}}
                loadData={async (path = '') => {
                    const data = await setTimeout(() => {}, 300)
                    return {}
                }}
                //     (path) => {
                //     const data = {
                //         '': {
                //             fullName: '',
                //             name: '',
                //             type: 'Folder',
                //             childCount: 1,
                //             load: true,
                //             children: [
                //                 {
                //                     fullName: 'playback/',
                //                     name: 'playback',
                //                     childCount: 2,
                //                     lastModifiedTimestamp: 1636347568000,
                //                     type: 'Folder',
                //                     children: [],
                //                     load: false,
                //                 },
                //             ],
                //             file: [],
                //         },
                //     };

                //     return data[path];
                // }}
            />
        )

        // screen.logTestingPlaygroundURL();
        // expect(screen.getByText(/root/i)).toBeDefined();

        // expect(screen.getByText(/File/i)).toBeDefined();
        // expect(screen.getByText(/Child count/i)).toBeDefined();
        // expect(screen.getByText(/Last Modified/i)).toBeDefined();

        // expect(screen.getByText(/no rows found/i)).toBeDefined();
    })
})
