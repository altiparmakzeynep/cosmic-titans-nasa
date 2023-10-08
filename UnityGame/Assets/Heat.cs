using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Heat : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        BaseManager.instance.heatLevel += 100;
    }

    // Update is called once per frame
    private void OnDisable()
    {
        BaseManager.instance.heatLevel -= 100;
    }
}
