import React, {useState} from 'react'
import {
	Carousel,
	Card
} from 'antd'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'

const { Meta } = Card;
const Block = () => {
	let [carousel, setCarousel] = useState<any>()
	let [dotIndex, setDotIndex] = useState<number>(0)

	const toggle = (type: string) => {
		if (type === 'prev') {
			setDotIndex(dotIndex <= 0 ? 1 : --dotIndex)
			carousel.prev()
		} else {
			setDotIndex(dotIndex >= 1 ? 0 : ++dotIndex)
			carousel.next()
		}
	}

  return (
    <div className="m-block-1">
      <div className="top">
        <div className="left">
          <h3 className="sub-title">新书速递</h3>
          <a className="more">更多</a>
        </div>
        <div className="right">
          {
            [1,2].map((item, index) => <div className={`dot ${index === dotIndex ? 'active' : null}`} key={index}></div>)
          }
					<LeftCircleOutlined style={{fontSize: 20, margin: '0 15px'}} onClick={() => toggle('prev')} />
					<RightCircleOutlined style={{fontSize: 20}} onClick={() => toggle('next')} />
        </div>
      </div>
      <div className="content">
				<Carousel ref={c => setCarousel(c)}>
					<div className="carousel-item">
						{
							[1,2,3,4].map((item, index) => <Card
								key={index}
								hoverable
								style={{ width: '140px', height: '200px', display: 'inline-block', margin: '0 10px'}}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
							>
								<Meta title="1111111111" description="www.instagram.com" />
							</Card>)
						}
					</div>
					<div className="carousel-item">
						{
							[1,2,3,4].map((item, index) => <Card
								key={index}
								hoverable
								style={{ width: '140px', display: 'inline-block', margin: '0 10px'}}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
							>
								<Meta title="22222222" description="www.instagram.com" />
							</Card>)
						}
					</div>
				</Carousel>
      </div>
    </div>
  )
}

export default Block