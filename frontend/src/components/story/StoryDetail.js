/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import palette from '../../lib/styles/palette'
import Button from '../common/Button'
import LinearProgressBar from '../common/LinearProgressBar'

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 15rem);
  padding: 0.5rem;
`
const CarouselBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  div {
    font-size: 16px;
  }
`

const CarouselStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .slick-list {
    margin: 0 0;
  }

  .slick-slide {
    cursor: pointer;
  }

  .slick-track {
    display: relative;
  }

  .story-text {
    font-size: 24px;
    font-weight: bold;
  }
`

const CarouselBody = styled.div``

const CarouselItem = css`
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.025);
  width: 700px;
  height: 700px;
  overflow: hidden;

  @media screen and (max-width: 1800px) {
    width: 500px;
    height: 500px;
  }

  @media screen and (max-width: 1024px) {
    width: 400px;
    height: 400px;
  }

  @media screen and (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`

const CarouselImage = css`
  width: 100%;
  height: 100%;
  flex: 1;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 6px;
`

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'none',
      }}
      css={css`
        margin-right: 9%;
      `}
      onClick={onClick}
    />
  )
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'none' }}
      css={css`
        margin-left: 9%;
      `}
      onClick={onClick}
    />
  )
}

const StoryDetail = ({ user_id, story, error, loading, onDeleteStory }) => {
  const settings = {
    infinite: true, // ????????? ??? ????????? ?????????(????????????)
    speed: 1000, // ???????????? ????????? ????????? ??? ?????????
    slidesToShow: 1, // ??? ???????????? ??? ??? ????????? ?????????
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  if (error) {
    if (error.response && error.response.status === 404) {
      return <div>???????????? ?????? ??????????????????.</div>
    }
    return <div>?????? ??????!</div>
  }
  if (loading['sale/GET_STORY'] || !story) {
    return <LinearProgressBar />
  }

  const { title, producer, contents } = story

  return (
    <CarouselWrapper>
      <CarouselBanner>
        <div>
          <h3>{title}</h3>
          <div>{producer.nickname} ?????????</div>
        </div>
        {user_id && user_id.toString() === producer.id.toString() && (
          <Button red onClick={onDeleteStory}>
            ??? ??????
          </Button>
        )}
      </CarouselBanner>
      <CarouselBody>
        <Slider css={CarouselStyle} carouselItems={contents} {...settings}>
          {contents.map((content) => (
            <>
              <div key={content.id} css={CarouselItem}>
                <img css={CarouselImage} src={content.img} alt="" />
              </div>
              <div className="story-text">{content.content}</div>
            </>
          ))}
        </Slider>
      </CarouselBody>
    </CarouselWrapper>
  )
}

export default StoryDetail
