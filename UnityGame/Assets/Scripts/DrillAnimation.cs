using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DrillAnimation : MonoBehaviour
{
    public float rotationSpeed = 30f; // Dönüþ hýzý (derece/saat cinsinden)
    public float moveSpeed = 1f; // Yükseklik deðiþim hýzý

    private bool movingUp = true;
    private float minY = 0f;
    private float maxY = 1.5f;


    // Update is called once per frame
    void Update()
    {
        RegularDrill();

    }
    public void RegularDrill()
    {
        // Y ekseni etrafýnda dönüþü hesaplayýn
        transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);

        // Yukarý ve aþaðý hareketi hesaplayýn
        if (movingUp)
        {
            transform.Translate(Vector3.up * moveSpeed * Time.deltaTime);
            if (transform.position.y >= maxY)
                movingUp = false;
        }
        else
        {
            transform.Translate(Vector3.down * moveSpeed * Time.deltaTime);
            if (transform.position.y <= minY)
                movingUp = true;
        }
    }

}
