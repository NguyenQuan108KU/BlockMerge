

using UnityEngine;

public class ResponsiveWorld : ResponsiveBase
{
  public Vector3 positionVertical;
  public Vector3 positionVerticalTall;
  public Vector3 positionHorizontal;
  public Vector3 positionTablet;
    public bool isSetScaleHorizontal;   
    public Vector3 scaleHorizontal;
    public Vector3 scaleVertical;
    public Vector3 scaleTablet;
    public Vector3 scaleTall;

    public override void Start()
  {
    base.Start();
  }
  public override void OnHorizontal()
  {

    transform.localPosition = positionHorizontal;
    if(isSetScaleHorizontal)
        transform.localScale = scaleHorizontal;
    }
  public override void OnVerticalTall()
  {
    transform.localPosition = positionVerticalTall;
        if (isSetScaleHorizontal)
            transform.localScale = scaleTall;
    }
  public override void OnVertical()
  {
    transform.localPosition = positionVertical;
        if (isSetScaleHorizontal)
            transform.localScale = scaleVertical;
    }

  public override void OnTablet()
  {

    transform.localPosition = positionTablet;
        if (isSetScaleHorizontal)
            transform.localScale = scaleTablet;
    }
}
