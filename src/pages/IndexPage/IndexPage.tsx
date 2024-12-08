import type { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SegmentedControl } from '@telegram-apps/telegram-ui';

export const IndexPage: FC = () => {
    let navigate = useNavigate()

    return (
      <>
        <Outlet />
        <div style={{
            position: 'absolute',
            width: '100%',
            bottom: '0',
            left: '0',
            marginTop: "100px"
        }}>
            <SegmentedControl>
                <SegmentedControl.Item selected onClick={() => navigate("/")}>
                    Wallet
                </SegmentedControl.Item>
                <SegmentedControl.Item onClick={() => navigate("/dapps")}>
                    Dapps
                </SegmentedControl.Item>
            </SegmentedControl>
        </div>
      </>
    );
}